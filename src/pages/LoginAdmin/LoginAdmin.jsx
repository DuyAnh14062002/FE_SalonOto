import "./LoginAdmin.scss";

export default function LoginAdmin() {
  return (
    <div className="wrap-login">
      <div className="container">
        <div className="card card-container">
          <img
            id="profile-img"
            className="profile-img-card"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt=""
          />
          <p id="profile-name" className="profile-name-card"></p>
          <form className="form-signin">
            <span id="reauth-email" className="reauth-email"></span>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required
              autofocus
            />
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
            />
            <div id="remember" className="checkbox">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button
              className="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <a href="/" className="forgot-password text-center">
            Forgot the password?
          </a>
        </div>
      </div>
    </div>
  );
}
