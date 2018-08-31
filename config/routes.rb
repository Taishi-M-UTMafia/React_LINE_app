Rails.application.routes.draw do
  root 'messages#index'
  get 'users/search' => 'users#search'

  devise_for :users, :controllers => {
   :registrations => 'users/registrations',
   :sessions      => 'users/sessions'
  }

  namespace :api, { format: 'json' } do
    get 'messages' => 'messages#index'
    post 'messages/post_message' => 'messages#post_message'
    post 'messages/post_image'   => 'messages#post_image'
    delete 'messages/dedstroy_message' => 'messages#destroy_message'

    get 'users/find_search_user'  => 'users#find_search_user'
    get 'users/find_current_user' => 'users#find_current_user'
    get 'users/find_friends'      => 'users#find_friends'
    get 'users/find_to_user'      => 'users#find_to_user'

    post 'friendships/create_friendship' => 'friendships#create_friendship'
    delete 'friendships/destroy_friendship' => 'friendships#destroy_friendship'
  end
end
