# Data specification

Project: SENSU Digital — enterprise site and interaction studies. Output language: English public example; use the client-requested language for new projects.

Scope: required.

SQLite local file .local/sensu.sqlite stores users, persistent sessions, inquiries and status audit. Inquiry fields include reference, name, company, email, service, description, status, version and timestamps. Status is new → in_progress → done. Save status and audit atomically. Keep test data isolated. Check persistence across restart. The explicit data:clear command requires a named scope and preserves staff accounts unless separately authorized. Do not publish database, runtime secret, sessions or local credentials.
