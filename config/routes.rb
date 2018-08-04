Rails.application.routes.draw do
  get 'users/search' => 'users#search'
  devise_for :users

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  root to: 'messages#index'
  namespace :api, { format: 'json' } do
    resources :messages
    # collectionでapiにルート追加できる
    resources :users ,:only => [:index, :search, :find_current_user, :find_friends] do
      collection do
        get :search
        get :find_current_user
        get :find_friends
      end
    end
    resources :friendships ,:only => [:create, :destroy_friend] do
      collection do
        post :destroy_friend
      end
    end
  end

end
