import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import type { components } from 'data/api'
import { get, handleError } from 'data/fetchers'
import type { ResponseError } from 'types'
import { usageKeys } from './keys'

export type OrgUsageVariables = {
  orgSlug?: string
  projectRef?: string
  start?: Date
  end?: Date
}

export type OrgUsageResponse = components['schemas']['OrgUsageResponse']
export type OrgMetricsUsage = components['schemas']['OrgMetricUsage']

export async function getOrgUsage(
  { orgSlug, projectRef, start, end }: OrgUsageVariables,
  signal?: AbortSignal
): Promise<OrgUsageResponse> {
  if (!orgSlug) throw new Error('orgSlug is required')
  const { data, error } = await get(`/platform/organizations/{slug}/usage`, {
    params: {
      path: { slug: orgSlug },
      query: { project_ref: projectRef, start: start?.toISOString(), end: end?.toISOString() },
    },
    signal,
  })
  if (error) handleError(error)
  return data
}

export type OrgUsageData = Awaited<ReturnType<typeof getOrgUsage>>
export type OrgUsageError = ResponseError

export const useOrgUsageQuery = <TData = OrgUsageData>(
  variables: OrgUsageVariables,
  options: UseQueryOptions<OrgUsageData, OrgUsageError, TData> = {}
) => {
  const { orgSlug, projectRef, start, end } = variables
  return useQuery<OrgUsageData, OrgUsageError, TData>({
    queryKey: usageKeys.orgUsage(orgSlug, projectRef, start?.toISOString(), end?.toISOString()),
    queryFn: ({ signal }) => getOrgUsage({ orgSlug, projectRef, start, end }, signal),
    enabled: options.enabled && typeof orgSlug !== 'undefined',
    ...options,
  })
}

