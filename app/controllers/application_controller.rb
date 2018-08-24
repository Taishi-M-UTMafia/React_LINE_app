class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  def after_sign_in_path_for(resource)
    users_search_url
  end

  # REVIEW(Sunny): 何もセットしてないからメソッド名が微妙→ ゆーても微妙
  # TODO(Sunny): ApplicationControllerにこのメソッドがあるのは変か
  def return_friendship_id(to_user_id)
    if current_user.id > to_user_id.to_i
      "#{to_user_id.to_i}-#{current_user.id}"
    else
      "#{current_user.id}-#{to_user_id.to_i}"
    end
  end

    private
      def sign_in_required
          redirect_to new_user_session_url unless user_signed_in?
          flash[:notice]="You have to log in" unless user_signed_in?
      end

    protected
      def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
        devise_parameter_sanitizer.permit(:account_update, keys: [:name])
      end
end
