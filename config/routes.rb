Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    resources :messages,:friendships,:users
  end

  resources :messages,:friendships,:users
  root to: 'messages#index'

  get 'users/search' => 'users#search'

  devise_for :users

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
end
