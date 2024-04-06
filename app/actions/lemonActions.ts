'use server'

import { redirect } from 'next/navigation'

export async function suscribeToProAction({
  projectId,
  projectName,
  userId,
  email,
  name,
}: {
  projectId: string
  projectName: string
  userId: string
  email: string
  name: string
}) {
  const checkout = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          product_options: {
            name: `sharepreviews Pro - ${projectName}`,
          },
          checkout_data: {
            email: email,
            name: name,
            custom: {
              userId: userId, // WorkOS user id
              projectId: projectId,
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: process.env.LEMON_SQUEEZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: 'variants',
              id: process.env.LEMON_SQUEEZY_PRO_VARIANT_ID,
            },
          },
        },
      },
    }),
  }).then((response) => response.json())

  const checkoutUrl = checkout.data.attributes.url
  redirect(checkoutUrl)
}

export async function logUsageRecordIncrementAction({
  subscriptionItemId,
  quantity,
}: {
  subscriptionItemId: string
  quantity: number
}) {
  await fetch('https://api.lemonsqueezy.com/v1/usage-records', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: 'usage-records',
        attributes: {
          quantity: quantity,
          action: 'increment',
        },
        relationships: {
          'subscription-item': {
            data: {
              type: 'subscription-items',
              id: String(subscriptionItemId),
            },
          },
        },
      },
    }),
  }).then((response) => response.json())
}

export async function getLemonSubscriptionAction(subscriptionId: string) {
  return await fetch(
    `https://api.lemonsqueezy.com/v1/subscriptions/${subscriptionId}`,
    {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
    }
  ).then((response) => response.json())
}

export async function goToLemonSubscriptionPortalAction(
  subscriptionId: string
) {
  const portal = await getLemonSubscriptionAction(subscriptionId)

  redirect(portal.data.attributes.urls.customer_portal)
}

export async function getCurrentLemonUsageAction(subscriptionItemId: string) {
  return await fetch(
    `https://api.lemonsqueezy.com/v1/subscription-items/${subscriptionItemId}/current-usage`,
    {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
    }
  ).then((response) => response.json())
}
