class RegistrationsController < Devise::RegistrationsController
  #Overwrite the devise regristration controller to parameters
  private

  def sign_up_params
    params.require(:user).permit(:name,:email,:password,:password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:name,:email,:password,:password_confirmation,:current_password)
  end

end
