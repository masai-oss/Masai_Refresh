package com.example.myapplication.activities

import android.content.Intent
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.Toast
import com.example.myapplication.GoogleSignInActivty
import com.example.myapplication.R
import kotlinx.coroutines.delay

class SplashActivity : AppCompatActivity() {
    var key : String? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)
        val sp : SharedPreferences = getSharedPreferences("LOGIN", MODE_PRIVATE)
         key = sp.getString("login_key",null)
        val handler = Handler(Looper.getMainLooper())
        handler.postDelayed({
            checkLogin()
        },2000)



    }
   private  fun checkLogin(){
        if (key!=null){
            val intent = Intent(this,TopicsActivity::class.java)
            intent.putExtra("token",key)
            Toast.makeText(this,"Welcome Back",Toast.LENGTH_SHORT).show()
            startActivity(intent)
            finish()}
        else{
            val intent = Intent(this,GoogleSignInActivty::class.java)
            Toast.makeText(this,"Login First",Toast.LENGTH_SHORT).show()
            startActivity(intent)
            finish()
        }

    }
}