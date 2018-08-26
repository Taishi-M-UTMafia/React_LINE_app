module Api
  class UsersController < ApplicationController
    def search
      # REVIEW(Sunny): 取得する件数をlimitする
      searched_users = User.limit(5).where('name LIKE ?', "%#{params[:value]}%").where.not(id: current_user.id)
      render json: searched_users
    end

    def find_current_user
      render json: current_user
    end

    def find_friends
      render json: current_user.friends
    end
  end
end
