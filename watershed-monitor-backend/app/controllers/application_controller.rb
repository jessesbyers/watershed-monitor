# class ApplicationController < ActionController::API
# end

# TEST ____________________________________________
class ApplicationController < ActionContoller::API
    def test
      render json: { test: "success" }
    end
  end
