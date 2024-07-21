Rails.application.routes.draw do
  devise_for :users, path: 'manager', controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations',
    passwords: 'users/passwords'
  }
  devise_scope  :user do
    get "/users/confirmations" => "users/confirmations#new"
  end

  root to: 'home#index'

  resources :roles
  resources :companies
  resources :cards
  resources :categories
  resources :statements


  resources :users do
    patch 'block', on: :member
    patch 'unblock', on: :member
    post 'user_block', on: :collection
    post 'user_unblock', on: :collection
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
