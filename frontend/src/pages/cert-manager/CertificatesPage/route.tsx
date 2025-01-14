import { createFileRoute } from '@tanstack/react-router'

import { CertificatesPage } from './CertificatesPage'

export const Route = createFileRoute(
  '/_authenticate/_inject-org-details/cert-manager/$projectId/_cert-manager-layout/overview',
)({
  component: CertificatesPage,
})
