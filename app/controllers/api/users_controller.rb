module Api
  class UsersController < ApplicationController

    def search
      # REVIEW(Sunny): 取得する件数をlimitする
      # whereで二つ以上の条件を指定したいときはメソッドチェーンを使う,取得件数は多くなりすぎないように(重くなるの回避)
      @users=User.limit(5).where('name LIKE ?', "%#{params[:value]}%").where.not(id: current_user.id)
      render json: @users
    end

    def find_current_user
      render json: current_user
    end

    def find_friends
      @friends=current_user.friends
      render json: @friends
    end
  end

end
