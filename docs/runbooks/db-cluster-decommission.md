# Decommissioning the legacy `-old1` Aurora cluster

This runbook covers retiring the `settings-aurora-<env>-old1` cluster after the
switchover to the new cluster has been verified in production for at least 7
days.

## 1. Confirm the new cluster is the source of truth

Run a smoke test against the new cluster and verify dashboards in Grafana show
healthy traffic for at least 24h before proceeding.

## 2. Delete the `-old1` cluster

Once confident there is no rollback need, delete the `-old1` cluster:

```bash
aws rds delete-db-cluster \
  --region <region> \
  --db-cluster-identifier settings-aurora-<env>-old1 \
  --skip-final-snapshot
```

Drop `--skip-final-snapshot` if you want a safety snapshot retained in
`Snapshots`. Also delete any writer instance attached to `-old1`
(`delete-db-instance`) if it persists after the cluster-delete call.

## 3. Clean up DNS

Remove the legacy CNAME from Route 53 once the cluster delete completes.
