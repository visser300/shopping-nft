import { Item } from '@kyuzan/mint-sdk-js'
import { PaginationMetadata } from '@kyuzan/mint-sdk-js/lib/apiClient'
import React, { ReactNode, useCallback } from 'react'
import { useAppDispatch } from '../../../redux/getStore'
import { getItemsActionCreator } from '../../../redux/items'
import {
  ListComponent,
  ListTitle,
  Title,
  CardUL,
  CardList,
  ActiveStatus,
  EmptyTitle,
  Subtitle,
} from '../../atoms/CardList'
import { Card } from '../../molecules/Card'

type Props = {
  items: Item[]
  paginationMetadata: PaginationMetadata | null
  children?: ReactNode
}

export const LiveAuctionList: React.FC<Props> = ({ items, paginationMetadata }) => {
  const dispatch = useAppDispatch()
  const getItems = useCallback(() => {
    dispatch(getItemsActionCreator() as any)
  }, [])
  if (items.length === 0) {
    return (
      <ListComponent>
        <ListTitle>
          <ActiveStatus />
          <Title>Live</Title>
        </ListTitle>
        <EmptyTitle>商品はありません</EmptyTitle>
      </ListComponent>
    )
  }
  return (
    <ListComponent>
      <ListTitle>
        <ActiveStatus />
        <Title>Live</Title>
        {paginationMetadata?.totalItems && (<Subtitle>Total item: {paginationMetadata?.totalItems}</Subtitle>)}
      </ListTitle>
      <CardUL>
        {items.map((item, i) => {
          return (
            <CardList key={i}>
              <Card loading={false} onAuctionFinish={getItems} item={item} />
            </CardList>
          )
        })}
      </CardUL>
    </ListComponent>
  )
}
