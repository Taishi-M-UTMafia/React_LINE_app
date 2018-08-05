import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import SearchForm from '../components/users/searchForm'

export default class SearchRouter extends BaseRouter {
  register() {
    this.route('/users/search', this.decorateSearchForm)
  }

  decorateSearchForm(ctx, next) {
    (new ReactDecorator()).decorate('react-search', SearchForm)
    next()
  }
}
