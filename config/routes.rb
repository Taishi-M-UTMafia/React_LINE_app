Rails.application.routes.draw do
  get 'users/search' => 'users#search'
  devise_for :users

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  root to: 'messages#index'
  namespace :api, { format: 'json' } do
    resources :messages,:friendships
    # collectionでapiにルート追加できる
    resources :users ,:only => [:index, :search] do
      collection do
        get :search
      end
  end

  end

  get 'api/users/search' => 'api/users#search'

end
