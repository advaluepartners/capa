import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useParams } from 'common'
import { SettingsLayout } from 'components/layouts'
import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import { ScaffoldContainer, ScaffoldHeader, ScaffoldTitle } from 'components/layouts/Scaffold'
//import { LoaderIcon } from 'components/ui/LoaderIcon/LoaderIcon'
import { Loading } from 'components/ui/Loading'
import { MessageInfoBox } from 'components/braincomponents/ui/MessageInfoBox/MessageInfoBox'
import  APIDocsButton from 'components/ui/APIDocsButton'
import { useBrainContext } from 'lib/context/BrainProvider/hooks/useBrainContext'
import { useKnowledgeToFeedContext } from 'lib/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext'
import { useToast } from 'hooks/brainhooks'
import { ButtonType } from 'types/braintypes/QuivrButton'
import type { NextPageWithLayout } from 'types'

import { BrainSearchBar } from 'pages/project/[ref]/brain/BrainsTabs/components/ManageBrains/BrainSearchBar'
import { BrainsList } from 'pages/project/[ref]/brain/BrainsTabs/components/ManageBrains/BrainsList/BrainsList'
import { useBrainsTabs } from 'hooks/brainhooks/useBrainsTabs'

const Brain: NextPageWithLayout = () => {
  const router = useRouter()
  const { ref } = useParams()
  const { project } = useProjectContext()
  const { publish } = useToast()
  const { setShouldDisplayFeedCard } = useKnowledgeToFeedContext()
  const { setIsBrainCreationModalOpened, fetchAllBrains } = useBrainContext()
  const { searchQuery, isFetchingBrains, setSearchQuery, brains } = useBrainsTabs()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBrains = async () => {
      try {
        await fetchAllBrains(ref)
        setIsLoading(false)
      } catch (error) {
        publish({
          variant: 'danger',
          text: 'Failed to load brains. Please try again.',
        })
        setIsLoading(false)
      }
    }

    loadBrains()
  }, [ref, fetchAllBrains, publish])

  const buttons: ButtonType[] = [
    {
      label: 'Create brain',
      color: 'primary',
      onClick: () => setIsBrainCreationModalOpened(true),
      iconName: 'brain',
    },
    {
      label: 'Add knowledge',
      color: 'primary',
      onClick: () => setShouldDisplayFeedCard(true),
      iconName: 'uploadFile',
    },
  ]

  if (isLoading || isFetchingBrains) {
    return (
      <ScaffoldContainer>
        <Loading size="big" color="accent" />
      </ScaffoldContainer>
    )
  }

  return (
    <>
      <ScaffoldContainer>
        <ScaffoldHeader>
          <ScaffoldTitle>Brain Management</ScaffoldTitle>
        </ScaffoldHeader>
      </ScaffoldContainer>
      <ScaffoldContainer className="flex flex-col gap-10">
        <div className="flex items-center justify-between space-x-6">
          <div className="w-64">
            <BrainSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex items-center gap-x-3">
            {buttons.map((button, index) => (
              <APIDocsButton key={index} {...button} />
            ))}
          </div>
        </div>

        {brains.length === 0 ? (
          <MessageInfoBox type="info">
            No brains found. Create your first brain to get started!
          </MessageInfoBox>
        ) : (
          <BrainsList brains={brains} />
        )}
      </ScaffoldContainer>
    </>
  )
}

Brain.getLayout = (page) => <SettingsLayout title="Brain Management">{page}</SettingsLayout>

export default Brain