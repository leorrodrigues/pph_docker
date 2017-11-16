class User < ApplicationRecord
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable, :timeoutable,:omniauthable, :omniauth_providers => [:facebook]

    def self.create_with_omniauth(auth)
        user = find_or_create_by(uid: auth[‘uid’], provider:  auth[‘provider’])
        user.email = “#{auth[‘uid’]}@#{auth[‘provider’]}.com”
        user.password = auth[‘uid’]
        user.name = auth[‘info’][‘name’]

        if User.exists?(user)
            user
        else
            user.save!
            user
        end
    end
end
