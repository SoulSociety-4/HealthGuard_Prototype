# Database

## Repository modes

All application services target the same repository interface: `create`, `list`, `findOne`, `findById`, `update`, `remove`, `removeMany`, `upsert`, and `count`.

- `MemoryRepository` is a complete, process-local development implementation. It is functional but not durable.
- `MongoRepository` maps the same operations to Mongoose. Set `DATABASE_MODE=mongo` for durable operation.

## Models

Identity and control: User, Session, DeveloperInvitation, Notification, AuditLog, Consent.

Patient-owned data: Patient, Family, FamilyMember, MedicalHistory, MedicalReport, Medication, Prescription, TimelineEvent, EmergencyHealthCard, LearningProgress, EmergencySession, AmbulanceRequest.

Operational/public data: Hospital, Doctor, Disease, MedicalProtocol, Ambulance, Driver, Flashcard, Quiz.

Owned models carry `ownerId`; child medical records also carry `patientId`. The API validates that the selected patient belongs to the authenticated owner before create, read, update, delete, download, or analysis.

## Identity and indexes

Mongoose collections use UUID string `_id` values. User email, session token hash, invitation token hash, source keys, protocol source ID, ambulance code, and driver user ID are unique where appropriate. Session expiry uses a TTL index. Ownership, patient, actor, and timestamp fields are indexed for their primary access paths.

Password, refresh, reset, invitation, and verification secrets are stored only as hashes. Repository reads explicitly select required hashes for trusted server services; API serializers remove them.

## Source imports

Startup performs idempotent upserts. Source keys keep provenance stable across repeated imports. The 435 supplied protocol rows contain 414 unique IDs; the importer records 21 duplicates and persists one record per source ID. Original OPD text remains attached to the hospital alongside normalized metadata.

## Migrations

This repository currently uses idempotent import/upsert migration rather than a separate migration framework. For production schema changes, add versioned migration scripts before deploying incompatible Mongoose changes. Do not run destructive collection rewrites from application startup.

