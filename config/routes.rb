Rails.application.routes.draw do
  get 'users/search' => 'users#search'
  get 'messages/index'=>'messages#index'

  devise_for :users

  devise_scope :user do
    root 'devise/registrations#new'
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
end
