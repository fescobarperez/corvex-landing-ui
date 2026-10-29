// CloudFront Function (viewer request, runtime cloudfront-js-2.0).
// Las páginas se generan como carpetas (/stackline/index.html); S3 privado con OAC no
// resuelve index.html en subcarpetas, así que se reescribe aquí:
//   /             -> /index.html
//   /stackline    -> /stackline/index.html
//   /en/          -> /en/index.html
// Los archivos con extensión (/assets/app.js, /sitemap.xml) pasan tal cual.
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else if (!uri.split('/').pop().includes('.')) {
    request.uri = uri + '/index.html';
  }
  return request;
}
