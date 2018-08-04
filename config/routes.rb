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
    resources :users ,:only => [:index, :search, :find_current_user, :find_friends] do
      collection do
        get :search
        get :find_current_user
        get :find_friends
      end
  end

  end

  get 'api/users/search' => 'api/users#search'

end
