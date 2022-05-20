const accessToken = '';

function handleAccessToken(request) {
  var requestAccessToken = request.parameter.accessToken;
  if (accessToken != requestAccessToken) {
    return false;
  }
  return true;
}