Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

    devise_for :users, controllers: { registrations: "registrations",:omniauth_callbacks => "callbacks"}

    match '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup

    resources :historics

    root 'home#index'

    get 'home/profile'

    get 'algorithms/saveToDB'

    post 'algorithms/index'
    get 'algorithms/index'
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
