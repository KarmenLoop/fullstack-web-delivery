#!/usr/bin/env python3
# Copyright (c) 2026 KarmenLoop. All rights reserved.
# SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
"""Render a validated, project-specific English specification pack. Standard library only."""
import argparse
import csv
import hashlib
import io
import json
from pathlib import Path
import shutil
import tempfile

MODULES = ('frontend', 'backend', 'auth', 'data', 'content', 'preview', 'acceptance')

def require_text(value, label):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f'{label}: provide a non-empty decision or an explicit unresolved fact')

def validate(brief):
    for key in ('project', 'purpose', 'audience', 'language', 'brand', 'research', 'authorization'):
        require_text(brief.get(key), key)
    if not isinstance(brief.get('decisions'), list) or not brief['decisions']:
        raise ValueError('decisions: retain the existing answers and their sources')
    if not isinstance(brief.get('pages'), list) or not brief['pages']:
        raise ValueError('pages: provide at least one page contract')
    routes, ids = set(), set()
    for page in brief['pages']:
        for key in ('id','route','audience','task','content','primary_action','hierarchy','responsive'):
            require_text(page.get(key), f'page {page.get("id", "?")}.{key}')
        if not page['route'].startswith('/') or page['route'] in routes or page['id'] in ids:
            raise ValueError('pages: routes must start with /; routes and IDs must be unique')
        routes.add(page['route']); ids.add(page['id'])
    for key in ('composition','typography','color','spacing','components','navigation','feedback','accessibility','responsive','assets'):
        require_text(brief.get('design', {}).get(key), f'design.{key}')
    roles = brief.get('roles', [])
    if not isinstance(roles, list) or any(not isinstance(r, str) or not r for r in roles):
        raise ValueError('roles: provide a list of role names')
    seen = set()
    for action in brief.get('interactions', []):
        for key in ('id','page','role','trigger','target','states','feedback','motion','recovery','verify'):
            require_text(action.get(key), f'action {action.get("id", "?")}.{key}')
        if action['id'] in seen or action['page'] not in ids or action['role'] not in roles:
            raise ValueError('interactions: unique ID, existing page and declared role are required')
        seen.add(action['id'])
        target = action['target']
        if target.startswith('route:') and target[6:] not in routes:
            raise ValueError(f'{action["id"]}: route target does not exist')
        if not target.startswith(('route:', 'api:', 'local:')):
            raise ValueError(f'{action["id"]}: target must use route:, api: or local:')
    for key in MODULES:
        module = brief.get('modules', {}).get(key, {})
        if module.get('status') not in ('required', 'not_applicable'):
            raise ValueError(f'modules.{key}: declare required or not_applicable')
        require_text(module.get('spec'), f'modules.{key}.spec')
    if brief['modules']['auth']['status'] == 'required' and not roles:
        raise ValueError('auth: required authentication needs declared roles')
    motion_ids = set()
    actions_by_id = {item['id']: item for item in brief.get('interactions', [])}
    for placement in brief.get('motion_map', []):
        for key in ('id','page','action','element','term','purpose','trigger','driver','timing','interruption','reduced','fallback','verify'):
            require_text(placement.get(key), f'motion placement {placement.get("id", "?")}.{key}')
        if placement['id'] in motion_ids or placement['page'] not in ids:
            raise ValueError('motion_map: unique placement ID and existing page are required')
        if placement['action'] not in actions_by_id or actions_by_id[placement['action']]['page'] != placement['page']:
            raise ValueError('motion_map: action must exist on the declared page')
        motion_ids.add(placement['id'])
    return brief

def render(brief):
    validate(brief)
    prefix = f'Project: {brief["project"]}. Output language: {brief["language"].rstrip(".")}.\n\n'
    facts = '\n'.join(f'- {item}' for item in brief['decisions'])
    assumptions = '\n'.join(f'- {item}' for item in brief.get('assumptions', [])) or '- No additional assumptions recorded.'
    pages = []
    for page in brief['pages']:
        pages.append(f'## {page["id"]} · {page["route"]}\n\n' + '\n\n'.join(f'**{key.replace("_", " ").title()}:** {page[key]}' for key in ('audience','task','content','primary_action','hierarchy','responsive')))
    actions = []
    for action in brief.get('interactions', []):
        actions.append(f'## {action["id"]} · {action["page"]}\n\n' + '\n\n'.join(f'**{key.title()}:** {action[key]}' for key in ('role','trigger','target','states','feedback','motion','recovery','verify')))
    files = {
        'PAGE-SPECS.md': '# Page contracts\n\n'+prefix+'\n\n'.join(pages)+'\n',
        'INTERACTION-SPECS.md': '# Action and state contracts\n\n'+prefix+('\n\n'.join(actions) or 'No interactive task is in scope. Do not invent one.')+'\n',
        'DECISIONS.md': '# Decisions, assumptions and authority\n\n'+prefix+f'## Reused decisions\n\n{facts}\n\n## Assumptions and pending facts\n\n{assumptions}\n\n## Research\n\n{brief["research"]}\n\n## Authorization\n\n{brief["authorization"]}\n',
    }
    files['DESIGN-SPEC.md'] = '# Design system and UX rules\n\n'+prefix+'\n\n'.join(f'## {key.title()}\n\n{value}' for key,value in brief['design'].items())+'\n'
    placements = brief.get('motion_map', [])
    files['MOTION-MAP.md'] = '# Motion placement and driver map\n\n'+prefix+'Each effect belongs to a page, element and task. The driver must be actual scroll, input or confirmed state. Acceptance remains NOT_RUN until operated.\n\n'+('\n\n'.join('## '+item['id']+' · '+item['term']+'\n\n'+'\n\n'.join('**'+key.title()+':** '+item[key] for key in ('page','action','element','purpose','trigger','driver','timing','interruption','reduced','fallback','verify')) for item in placements) or 'No placements supplied. Derive purposeful placements from the actual task before adding motion; do not invent a universal effects quota.')+'\n'
    motion = brief.get('motion', [])
    files['MOTION-SPECS.md'] = '# Motion choreography\n\n'+prefix+'Every adopted motion needs a purpose, trigger, linked state, duration/curve, interruption, keyboard/touch path, reduced-motion path and observable acceptance. Do not add all six studies to every project.\n\n'+'\n\n'.join(f'## {item["id"]}\n\n{item["spec"]}' for item in motion)+'\n'
    for key in MODULES:
        module=brief['modules'][key]
        files[f'{key.upper()}-SPEC.md'] = f'# {key.title()} specification\n\n'+prefix+f'Scope: {module["status"]}.\n\n{module["spec"]}\n'
    module_links='\n'.join(f'- [{key.title()} specification]({key.upper()}-SPEC.md) — {brief["modules"][key]["status"]}' for key in MODULES)
    files['README.md'] = '# Project specification pack\n\n'+prefix+'Generated from the supplied answered brief. Generation is not proof that implementation or acceptance has happened. Review assumptions, then implement authorized flows.\n\n- [UI/UX implementation prompt](UI-UX-PROMPT.md)\n- [Design specification](DESIGN-SPEC.md)\n- [Page contracts](PAGE-SPECS.md)\n- [Action and state contracts](INTERACTION-SPECS.md)\n- [Motion choreography](MOTION-SPECS.md)\n- [Motion placement map](MOTION-MAP.md)\n- [Decisions and authorization](DECISIONS.md)\n'+module_links+'\n- [Traceability](TRACEABILITY.csv)\n- [Integrity manifest](spec-manifest.json)\n'
    files['UI-UX-PROMPT.md'] = '# Project-specific UI/UX implementation prompt\n\n'+prefix+f'''Implement the following project in its existing context. Reuse these answers; do not restart discovery.\n\nPurpose: {brief['purpose']}\n\nAudience: {brief['audience']}\n\nVisual direction: {brief['brand']}\n\n## Design rules\n\n'''+ '\n\n'.join(f'{key.title()}: {value}' for key,value in brief['design'].items())+f'''\n\nResearch and reference decisions: {brief['research']}\n\n## Established decisions\n\n{facts}\n\n## Required page contracts\n\n'''+ '\n\n'.join(page.replace('## ', '### ', 1) for page in pages)+'''\n\n## Required interaction contracts\n\n'''+ '\n\n'.join(action.replace('## ', '### ', 1) for action in actions)+f'''\n\n## Layout comparison and visual decisions\n\nFor a new website or substantial visual redesign, use these contracts as the shared brief for three materially different representative layouts. Compare information order, composition, hierarchy or navigation using the same truthful content, core action and brand constraints; color swaps alone are insufficient. Build and operate the primary interaction in each option, verify actual desktop and phone widths, then open a reachable A/B/C comparison in the user-facing browser. Provide direct option links, matched labeled views and concise tradeoffs before asking for selection, combination or revision feedback.\n\nReuse a specifically chosen layout or supplied design and keep targeted fixes in scope. An agreed palette alone does not choose a layout. Preserve pending decisions and continue independent authorized work; wait for required feedback before expanding dependent templates. When visual choice is explicitly delegated, record the reasoned agent selection and show its basis without calling it human approval. Update this prompt, the design contracts and the existing decision ledger after selection.\n\nFor later consequential layout, navigation or interaction choices, show a focused working comparison, annotated views or a flow diagram before asking. Mark unavailable browser operation NOT_RUN and distinguish wireframes or mockups from working pages.\n\n## Build and inspect\n\nRead DESIGN-SPEC.md, MOTION-SPECS.md, MOTION-MAP.md and the module specifications linked in README.md. Every enabled control must navigate to its declared destination or perform its stated action. Start feedback at input, distinguish pending from success, preserve input on failure, prevent duplicate submissions, and retain visible keyboard focus. Specify empty, loading, error, disabled, success and interrupted states where applicable. Use content-driven layouts and real copy. Preserve native links, controls, browser history and touch scrolling.\n\n{brief['modules']['acceptance']['spec']}\n\nShow the complete plan and these contracts before implementation. Continue only within this authority: {brief['authorization']}\n\nPending facts and assumptions:\n\n{assumptions}\n\nDeliver source, startup/preview instructions, actual verification evidence and honest limits. Do not invent customer proof, copy a reference identity, treat a screenshot as motion proof, or claim a platform was tested because a skill file loads there.\n'''
    out=io.StringIO(newline='');writer=csv.writer(out);writer.writerow(['requirement','page','role','target','verification','result'])
    for action in brief.get('interactions', []):
        writer.writerow([action['id'],action['page'],action['role'],action['target'],action['verify'],'NOT_RUN'])
    files['TRACEABILITY.csv']=out.getvalue()
    canonical=json.dumps(brief,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()
    manifest={'schema':2,'generator_version':'0.7.0','input_sha256':hashlib.sha256(canonical).hexdigest(),'verification':'NOT_RUN','files':{name:hashlib.sha256(body.encode()).hexdigest() for name,body in sorted(files.items())}}
    files['spec-manifest.json']=json.dumps(manifest,indent=2,ensure_ascii=False)+'\n'
    return files

def generate(brief, output):
    files=render(brief)  # Validate and render completely before any output mutation.
    output=Path(output)
    if output.exists():
        raise ValueError('Output already exists. Use a new revision directory; preserve authored documents.')
    output.parent.mkdir(parents=True,exist_ok=True)
    staging=Path(tempfile.mkdtemp(prefix='.spec-',dir=output.parent))
    try:
        for name,body in files.items():
            with (staging/name).open('w',encoding='utf-8',newline='') as handle:
                handle.write(body)
        # Exclusive directory creation protects even a concurrently created empty folder.
        output.mkdir()
        for child in staging.iterdir():
            child.rename(output/child.name)
    finally:
        if staging.exists(): shutil.rmtree(staging)
    return len(files)

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--brief',type=Path,required=True)
    parser.add_argument('--out',type=Path,required=True)
    args=parser.parse_args()
    try:
        count=generate(json.loads(args.brief.read_text(encoding='utf-8')),args.out)
    except (ValueError,KeyError,TypeError,OSError) as error:
        parser.exit(2,f'Specification generation stopped: {error}\n')
    print(f'Generated {count} documents. Review assumptions and execute acceptance separately.')

if __name__=='__main__': main()
