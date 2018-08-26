module Api
  class UsersController < ApplicationController
    def find_search_user
      # REVIEW(Sunny): 取得する件数をlimitする
      search_users = User.limit(5).where('name LIKE ?', "%#{params[:value]}%").where.not(id: current_user.id)
      render json: search_users
    end

    def find_current_user
      render json: current_user
    end

    def find_friends
      render json: current_user.friends
    end
  end
end
