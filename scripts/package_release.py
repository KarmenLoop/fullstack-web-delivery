# Copyright (c) 2026 KarmenLoop. All rights reserved.
# SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
"""Create exact source/skill archives without local runtime state."""
from pathlib import Path
import hashlib,json,zipfile,os
root=Path(__file__).resolve().parents[1]
version=(root/'VERSION').read_text().strip()
out=root/'release-artifacts';out.mkdir(exist_ok=True)
excluded={'.git','node_modules','dist','.local','__pycache__','release-artifacts','.DS_Store'}
def collect(folder):
    data={}
    for base,directories,names in os.walk(folder):
        relative=Path(base).relative_to(folder)
        directories[:]=sorted(name for name in directories if name not in excluded and (relative/name).parts[:2] != ('.impeccable','review'))
        for name in sorted(names):
            if name in excluded or (name.startswith('.env') and name!='.env.example'):continue
            path=Path(base)/name
            if path.is_symlink():raise ValueError(f'Symlink needs an explicit distribution decision: {path.relative_to(folder)}')
            data[str(path.relative_to(folder))]=path.read_bytes()
    return data
def package(name,prefix,data):
    manifest={'version':version,'files':[{'path':p,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()} for p,b in sorted(data.items())]}
    data=dict(data);data['DISTRIBUTION-MANIFEST.json']=(json.dumps(manifest,indent=2)+'\n').encode()
    dest=out/name
    with zipfile.ZipFile(dest,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        for p,b in sorted(data.items()):z.writestr(prefix+'/'+p,b)
    with zipfile.ZipFile(dest) as z:
        assert z.testzip() is None
        assert set(z.namelist())=={prefix+'/'+p for p in data}
        for p,b in data.items():assert z.read(prefix+'/'+p)==b
    return {'file':dest.name,'bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'members':len(data),'exact_archive_check':'PASS'}
items=[package(f'fullstack-web-delivery-skill-v{version}.zip','fullstack-web-delivery',collect(root/'skills/fullstack-web-delivery')),package(f'fullstack-web-delivery-complete-v{version}.zip',f'fullstack-web-delivery-{version}',collect(root))]
(out/'release-integrity.json').write_text(json.dumps({'version':version,'status':'PASS','exclusions':sorted(excluded|{'.impeccable/review/','.env* except .env.example'}),'artifacts':items},indent=2)+'\n')
(out/'SHA256SUMS.txt').write_text(''.join(f"{x['sha256']}  {x['file']}\n" for x in items))
print(json.dumps(items,indent=2))
