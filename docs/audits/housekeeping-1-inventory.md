# Housekeeping Audit: Inventory (Step 1)

Branch: feature/housekeeping-1
Date: 2025-09-24
Scope: Non-destructive inventory of likely duplicates/backup/snapshot folders and files.

## Candidates (Backups / Snapshots)
- `app/page_backup_final_20250913_112412.tsx`
- `src/components/Menu/Menu_backup_final_20250913_112637.jsx`
- `src/components/Menu/Menu_backup_final_20250913_112637.css`
- `src/components/LiquidEther_backup_original.jsx`
- `src/components/LiquidEther_backup_working.jsx`
- `src/components/LiquidEther_backup_final_20250913_112650.jsx`
- `src/components/LiquidEther_backup_faster_animation.jsx`
- `handoff/page.snapshot.tsx`

## Legacy / Redundant Directories
- `restore_backup/`
- `handoff/`
- `OLD/`

## Third-Party (Ignore)
- `node_modules/lucide-react/dist/esm/icons/database-backup.js`
- `node_modules/lucide-react/dist/esm/icons/database-backup.js.map`
- `node_modules/googleapis/build/src/apis/backupdr/`
- `node_modules/googleapis/build/src/apis/gkebackup/`

## Proposed Disposition (for Review)
- Keep (temporarily, for reference):
  - `handoff/`, `restore_backup/` (remove later after final parity sign-off)
- Archive/Delete (after approval):
  - All `*_backup*` files and `app/page_backup_final_*.tsx`
  - Entire `OLD/` directory
- Ignore: third-party entries listed above

## Notes
- No files changed or deleted in this step.
- Next step (after approval): remove the approved backup files and `OLD/` directory in a single, small PR. Create a Git tag before deletion for a restore point.
