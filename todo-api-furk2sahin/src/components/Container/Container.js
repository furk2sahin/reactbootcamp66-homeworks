import React from 'react'
import { Wrapper } from './Container.styles'
import { TodoList } from '../TodoList'

export const Container = () => {
    return (
        <Wrapper>
            <TodoList />
        </Wrapper>
    )
}
