import { Router } from 'vue-router'

export const useRouteQueries: <QueriesType>(router: Router) => QueriesType = (router: Router) => {
  const routeQuery = router.currentRoute.value.query['queriesJSONString']
  return JSON.parse(routeQuery as string)
}
