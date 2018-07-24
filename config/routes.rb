Rails.application.routes.draw do
  devise_for :users
    get 'pages/index' => 'pages#index'
    get 'pages/show'  => 'pages#show'
    get 'messsages/index'=>'messages#index'

  devise_scope :user do
    root 'devise/registrations#new'
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
end
