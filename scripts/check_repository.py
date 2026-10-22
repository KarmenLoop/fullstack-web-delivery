# Copyright (c) 2026 KarmenLoop. All rights reserved.
# SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
"""Check the public distribution boundary without installing a website runtime."""
from pathlib import Path
import json,re,sys,hashlib
root=Path(__file__).resolve().parents[1]
problems=[];checked_links=0;authored=[]
for p in sorted(root.rglob('*')):
    if not p.is_file() or any(x in {'.git','node_modules','dist','.local','release-artifacts','__pycache__'} for x in p.relative_to(root).parts) or p.relative_to(root).parts[:2]==('.impeccable','review'):continue
    authored.append(p)
    if p.suffix in {'.md','.yml','.yaml','.js','.jsx','.mjs','.py','.css','.html'}:
        text=p.read_text(encoding='utf-8')
        if p.suffix != '.md' and re.search(r'[\u4e00-\u9fff]',text):problems.append(f'Non-English authored text: {p.relative_to(root)}')
        if ('/'+'Users'+'/') in text or re.search(r'[A-Z]:\\Users\\',text):problems.append(f'Machine path in public text: {p.relative_to(root)}')
    if p.suffix=='.md':
        if re.search(r'^#(?: #)+ ', p.read_text(), re.M):problems.append(f'Malformed heading: {p.relative_to(root)}')
        for m in re.finditer(r'!?\[[^\]]*\]\(([^)]+)\)',p.read_text()):
            d=m.group(1).split(' "')[0].strip('<>')
            if re.match(r'\w+://',d) or d.startswith('#'):continue
            d=d.split('#')[0]
            if not d:continue
            checked_links+=1
            if not (p.parent/d).is_file():problems.append(f'Missing link in {p.relative_to(root)}: {d}')
skill=root/'skills/fullstack-web-delivery';entry=(skill/'SKILL.md').read_text()
if not entry.startswith('---\nname: fullstack-web-delivery\ndescription: '):problems.append('Skill frontmatter identity changed')
q=re.findall(r'^\d+\. (Q\d{2})\b',(skill/'references/discovery.md').read_text(),re.M)
if q!=[f'Q{i:02}' for i in range(1,41)]:problems.append('Question declarations must be unique and ordered Q01-Q40')
for name in ['LICENSE','NOTICE']:
    if (root/name).read_bytes()!=(skill/name).read_bytes():problems.append(f'Standalone {name} differs from root')
for name in ['website-desktop.png','website-mobile.png','admin-desktop.png','admin-mobile.png','inquiry-receipt.png']:
    p=root/'docs/images'/name
    if not p.is_file() or p.read_bytes()[:8]!=b'\x89PNG\r\n\x1a\n':problems.append(f'Missing/invalid capture: {name}')
for name in ['publication-browser.json','publication-checks.json']:
    p=root/'evidence'/name
    if not p.is_file():problems.append(f'Missing release evidence: {name}')
    elif json.loads(p.read_text()).get('status')!='PASS':problems.append(f'Evidence is not PASS: {name}')
pack=root/'docs/generated/sensu'
manifest=json.loads((pack/'spec-manifest.json').read_text())
brief=json.loads((root/'docs/specification-inputs/sensu.json').read_text())
canonical=json.dumps(brief,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()
if manifest['input_sha256']!=hashlib.sha256(canonical).hexdigest():problems.append('Generated pack input fingerprint drift')
for name,digest in manifest['files'].items():
    p=pack/name
    if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=digest:problems.append(f'Generated specification drift: {name}')
print(json.dumps({'status':'FAIL' if problems else 'PASS','authored_files':len(authored),'relative_links':checked_links,'questions':len(q),'problems':problems},indent=2))
sys.exit(bool(problems))
