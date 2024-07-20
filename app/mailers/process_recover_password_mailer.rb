class ProcessRecoverPasswordMailer < ApplicationMailer
  default from: 'from@example.com'
  layout 'mailer'


  def send_link(user, password,title)
    recipient = user.email.to_s
    mail(
        to: recipient,
        subject: title,
        body: " Caro(a) <b> #{user.name}</b>, <br> você solicitou a recuperação de sua senha de acesso ao sistema. <br> Foi gerado para você uma senha temporaria para seu primeiro acesso.  <br>Senha: <b> #{password} </br>",
        content_type: 'text/html'
    )
  end

end
