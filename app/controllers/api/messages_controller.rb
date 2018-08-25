module Api
  class MessagesController < ApplicationController

    def index
      # REVIEW(Sunny): Messageモデルのfriendship_idはfriendshipのidを入れるようにする
      friendship=Friendship.find_by(friendship_id: friendship_id(params[:open_chat_id]))
      render json: friendship.all_messages
    end

    def create
      friendship=Friendship.find_by(friendship_id: friendship_id(params[:open_chat_id]))
      new_message=Message.new(content: params[:value],      from_user_id: current_user.id,
                              friendship_id: friendship.id, message_type: "text")
      if  new_message.save
        render json: friendship.all_messages
      end
    end

    def post_image
      # FIXME: セキュリティが弱い？ストロングパラメータ使う、他にもどこが弱いか調べるなど
      # FIXME: Outpput_pathいる？コードをもっとスリムに
      image = params[:image]
      path= Time.now.to_i.to_s + image.original_filename
      output_path = Rails.root.join('public/message_images', path)
      friendship=Friendship.find_by(friendship_id: friendship_id(params[:open_chat_id]))
      File.open(output_path, 'w+b') do |fp|
        fp.write  image.tempfile.read
      end
      new_image=Message.new(content: path, from_user_id: current_user.id,
                          friendship_id: friendship.id, message_type: "image")
      if new_image.save
        render json: friendship.all_messages
      end
    end
  end

end
