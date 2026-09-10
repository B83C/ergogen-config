# ergogen-config (b83c)

Ergogen keyboard config bundle. Loadable by the ergogen web UI ("load from repo")
or the CLI (`ergogen .`).

## Layout
- `config.yaml` — primary config (= former `custom_norme_choc.yaml`)
- `custom_norme_choc_tjf.yaml`, `custom_norme.yaml`, `config_expensive.yaml` — alt configs; swap in by renaming to `config.yaml`
- `footprints/custom/` — own footprints
- `footprints/ceoloide/` — vendored subset of ceoloide/ergogen-designs
- `footprints/infused-kim/` — vendored `trackpoint_mount` (was a symlink into ceoloide/backlog/infused-kim)

## Migration notes
Extracted from the ergogen source checkout. Symlinked footprint dirs
(`infused-kim`, `mrzealot`, `tildewill`, `virginia2244`) were resolved;
only `infused-kim/trackpoint_mount` is actually referenced and is now a real file.
