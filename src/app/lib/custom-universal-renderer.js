import Loading from 'app/components/loading'
import React from 'react'

export default function customUniversalRenderer(props, Component, isLoading, error) {
  if (isLoading) return <Loading />

  if (error && __DEV__) {
    throw error
  } else if (error) {
    return <Loading error={ error } />
  }

  if (Component) return <Component { ...props } />

  return null
}
