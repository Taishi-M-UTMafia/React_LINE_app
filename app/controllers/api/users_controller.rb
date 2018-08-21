module Api
  class UsersController < ApplicationController
    before_action :set_current_user, { only:[:find_current_user, :find_friends] }

    def search
      # whereで二つ以上の条件を指定したいときはメソッドチェーンを使う
      @users=User.where('name LIKE ?', "%#{params[:value]}%").where.not(id: current_user.id)
      render json: @users
    end

    def find_current_user
      render json: @user
    end

    def find_friends
      @friends=@user.friends
      render json: @friends
    end
  end

end
