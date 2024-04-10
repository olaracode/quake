Rails.application.routes.draw do
  namespace :api do
    resources :features do
      get 'comments', on: :member
    end
  end
end
