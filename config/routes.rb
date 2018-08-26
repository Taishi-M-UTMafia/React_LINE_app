Rails.application.routes.draw do
  root 'messages#index'
  get 'users/search' => 'users#search'

  devise_for :users, :controllers => {
   :registrations => 'users/registrations',
   :sessions      => 'users/sessions'
  }

  namespace :api, { format: 'json' } do
    resources :messages, :only => [:index, :post_message, :post_image] do
      collection do
        post :post_message
        post :post_image
      end
    end

    resources :users ,:only => [:find_search_user, :find_current_user, :find_friends] do
      collection do
        get :find_search_user
        get :find_current_user
        get :find_friends
      end
    end

    resources :friendships ,:only => [:create_friendship, :destroy_friendship] do
      collection do
        post   :create_friendship
        delete :destroy_friendship
      end
    end
  end
end
