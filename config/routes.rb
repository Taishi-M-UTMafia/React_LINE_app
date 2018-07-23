Rails.application.routes.draw do
  root 'messages#index'

  devise_for :users
  get 'pages/index' => 'pages#index'

  get 'pages/show'  => 'pages#show'
end
