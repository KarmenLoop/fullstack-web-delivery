# Copyright (c) 2026 KarmenLoop. All rights reserved.
# SPDX-License-Identifier: LicenseRef-KarmenLoop-Source-Available-No-Modification-1.0
"""Exercise specification decisions and output protection, not just template headings."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('renderer', ROOT/'skills/fullstack-web-delivery/scripts/generate_project_specs.py')
renderer=importlib.util.module_from_spec(spec);spec.loader.exec_module(renderer)

class SpecificationTests(unittest.TestCase):
    def setUp(self):
        self.brief=json.loads((ROOT/'docs/specification-inputs/sensu.json').read_text())

    def test_real_brief_carries_audiences_targets_recovery_and_authority(self):
        files=renderer.render(self.brief)
        prompt=files['UI-UX-PROMPT.md']
        self.assertIn('Visitor; no account required',prompt)
        self.assertIn('api:POST /api/inquiries',prompt)
        self.assertIn('viewer can only read',files['AUTH-SPEC.md'])
        self.assertIn('Preserve entered data on error',prompt)
        self.assertIn(self.brief['authorization'],prompt)
        self.assertIn('I10,P12,visitor,local:radial-route',files['TRACEABILITY.csv'])
        self.assertEqual(len(self.brief['interactions']),files['TRACEABILITY.csv'].count('NOT_RUN'))

    def test_static_project_does_not_receive_an_account_or_api_system(self):
        brief=copy.deepcopy(self.brief)
        brief.update(project='Three-page studio',roles=['visitor'],pages=self.brief['pages'][:2],interactions=self.brief['interactions'][:1],motion=[],motion_map=[],ui_matches=[])
        for key in ('backend','auth','data'):
            brief['modules'][key]={'status':'not_applicable','spec':'Static content and ordinary links; no submitted data or accounts in scope.'}
        files=renderer.render(brief)
        self.assertIn('Scope: not_applicable',files['AUTH-SPEC.md'])
        self.assertNotIn('/api/login',files['AUTH-SPEC.md'])

    def test_invalid_page_role_and_target_are_rejected_before_any_output(self):
        for key,value in [('page','P99'),('role','undeclared'),('target','route:/missing')]:
            with self.subTest(key=key),tempfile.TemporaryDirectory() as folder:
                brief=copy.deepcopy(self.brief);brief['interactions'][0][key]=value
                output=Path(folder)/'specs'
                with self.assertRaises(ValueError):renderer.generate(brief,output)
                self.assertFalse(output.exists())

    def test_missing_task_is_not_filled_with_an_invented_assumption(self):
        self.brief['pages'][0]['task']=''
        with self.assertRaisesRegex(ValueError,'task'):renderer.render(self.brief)

    def test_existing_authored_documents_are_preserved(self):
        with tempfile.TemporaryDirectory() as folder:
            output=Path(folder)/'specs';output.mkdir();authored=output/'PAGE-SPECS.md';authored.write_text('Human changes')
            with self.assertRaisesRegex(ValueError,'already exists'):renderer.generate(self.brief,output)
            self.assertEqual(authored.read_text(),'Human changes')

    def test_generation_is_deterministic_and_manifest_matches_every_document(self):
        files=renderer.render(self.brief);self.assertEqual(files,renderer.render(self.brief))
        manifest=json.loads(files['spec-manifest.json'])
        for name,digest in manifest['files'].items():
            self.assertEqual(digest,hashlib.sha256(files[name].encode()).hexdigest())
        with tempfile.TemporaryDirectory() as folder:
            output=Path(folder)/'specs';renderer.generate(self.brief,output)
            self.assertEqual(files,{p.name:p.read_text() for p in output.iterdir()} | {'TRACEABILITY.csv':(output/'TRACEABILITY.csv').read_bytes().decode()})

    def test_motion_placements_keep_page_action_and_driver_boundaries(self):
        for key,value in [('page','P01'),('action','missing-action'),('driver','')]:
            with self.subTest(key=key),tempfile.TemporaryDirectory() as folder:
                brief=copy.deepcopy(self.brief)
                brief['motion_map'][0][key]=value
                output=Path(folder)/'specs'
                with self.assertRaises(ValueError):renderer.generate(brief,output)
                self.assertFalse(output.exists())
        files=renderer.render(self.brief)
        self.assertIn('POST /api/login starts',files['MOTION-MAP.md'])
        self.assertIn('Confirmed response only',files['MOTION-MAP.md'])

    def test_ui_matches_preserve_task_reasons_static_elements_and_omissions(self):
        files=renderer.render(self.brief)
        decisions=files['UI-MATCH-SPEC.md']
        self.assertIn('Tabular numerals and reserved numeric width', decisions)
        self.assertIn('None; static presentation.', decisions)
        self.assertIn('**Choice:** defer', decisions)
        self.assertIn('**Choice:** omit', decisions)
        self.assertIn('already legible', decisions)
        self.assertEqual(len(self.brief['ui_matches']), decisions.count('**Execution:** NOT_RUN'))
        self.assertIn('Required UI matching decisions', files['UI-UX-PROMPT.md'])
        self.assertIn('no GPU dependency', files['UI-UX-PROMPT.md'])

    def test_ui_match_scope_and_reason_are_validated_before_output(self):
        cases=[('page','P99'),('action','I04'),('choice','always'),('reason',''),('fallback','')]
        for key,value in cases:
            with self.subTest(key=key),tempfile.TemporaryDirectory() as folder:
                brief=copy.deepcopy(self.brief);brief['ui_matches'][0][key]=value
                output=Path(folder)/'specs'
                with self.assertRaises(ValueError):renderer.generate(brief,output)
                self.assertFalse(output.exists())
        self.brief['ui_matches'].append(copy.deepcopy(self.brief['ui_matches'][0]))
        with self.assertRaisesRegex(ValueError,'unique ID'):renderer.render(self.brief)

if __name__=='__main__':unittest.main()
