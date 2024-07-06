import { createContext, useContext } from 'react'

import { type ICommandsState } from './state/commandsState'
import { type IPagesState } from './state/pagesState'
import { type IQueryState } from './state/queryState'
import { type IViewState } from './state/viewState'

const CommandContext = createContext<
  | {
      commandsState: ICommandsState
      pagesState: IPagesState
      queryState: IQueryState
      viewState: IViewState
    }
  | undefined
>(undefined)

const useCommandContext = () => {
  const ctx = useContext(CommandContext)
  if (!ctx) throw Error('`useCommandContext` must be used within a `CommandProvider`')
  return ctx
}

export { CommandContext, useCommandContext }
