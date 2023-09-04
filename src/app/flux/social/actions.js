import A from './action-types'

export const receiveNewsletterSubscription = () => ({
  type: A.RECEIVE_NEWSLETTER_SUBSCRIPTION,
})

export const socialRequestFailed = error => ({
  error: true,
  payload: {
    error,
  },
  type: A.SOCIAL_REQUEST_FAILED,
})

export const subscribeToNewsletter = email => ({
  payload: {
    email,
  },
  type: A.SUBSCRIBE_TO_NEWSLETTER,
})
