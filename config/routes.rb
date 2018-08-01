Rails.application.routes.draw do
  get 'users/search' => 'users#search'

  namespace :api, { format: 'json' } do
    resources :messages,:friendships,:users
  end

  resources :messages,:friendships,:users
  root to: 'messages#index'


  devise_for :users

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
end
