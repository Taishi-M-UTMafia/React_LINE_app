Rails.application.routes.draw do
  root 'messages#index'
  get 'users/search' => 'users#search'

  devise_for :users, :controllers => {
   :registrations => 'users/registrations',
   :sessions      => 'users/sessions'
  }

  namespace :api, { format: 'json' } do
    resources :messages, :only => [:index, :create, :post_image] do
      collection do
        post :post_image
      end
    end

    resources :users ,:only => [:search, :find_friends, :find_current_user] do
      collection do
        get :search
        get :find_friends
        get :find_current_user
      end
    end

    resources :friendships ,:only => [:create, :destroy_friendship] do
      collection do
        delete :destroy_friendship
      end
    end
  end
end
