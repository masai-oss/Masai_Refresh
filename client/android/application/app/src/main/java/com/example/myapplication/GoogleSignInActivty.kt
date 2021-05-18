package com.example.myapplication

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication.AuthResponse.AuthTask


import com.example.myapplication.activities.TopicsActivity
import com.example.myapplication.network.Network
import com.example.myapplication.network.TopicApi
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.Scopes
import com.google.android.gms.common.SignInButton
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.common.api.Scope
import com.google.android.gms.tasks.OnCompleteListener
import com.google.android.gms.tasks.Task
import kotlinx.android.synthetic.main.activity_google_sign_in_activty.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GoogleSignInActivty : AppCompatActivity() {

    lateinit var mGoogleSignInClient: GoogleSignInClient
    lateinit var mGoogleSignInAccount: GoogleSignInAccount
    var key: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_google_sign_in_activty)
        val handler = Handler(Looper.getMainLooper())
        handler.postDelayed({
            checkLogin()
        }, 2000)
        val gso: GoogleSignInOptions =
            GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(BuildConfig.GSignIn_Key)
                .requestScopes(Scope(Scopes.PROFILE))
                .requestEmail().build()
        mGoogleSignInClient = GoogleSignIn.getClient(this@GoogleSignInActivty, gso)
        Log.d("token", "start")
//        mGoogleSignInAccount = GoogleSignIn.getLastSignedInAccount(this)!!
        gSignInBtn.setSize(SignInButton.SIZE_STANDARD)
        gSignInBtn.setOnClickListener {
            signIn()
        }
    }

    private fun checkLogin() {
        val sp: SharedPreferences = getSharedPreferences("LOGIN", MODE_PRIVATE)
        key = sp.getString("login_key", null)

        if (key != null) {
            val intent = Intent(this, TopicsActivity::class.java)
            intent.putExtra("token", key)
            Toast.makeText(this, "Welcome Back", Toast.LENGTH_SHORT).show()
            startActivity(intent)
            finish()
        } else {
            mGoogleSignInClient.signOut().addOnCompleteListener(this, OnCompleteListener {

            })
            gSignInBtn.visibility = View.VISIBLE
        }

    }

    private fun signIn() {
        val intent: Intent = mGoogleSignInClient.signInIntent
        startActivityForResult(intent, 101)
    }

//    override fun onStart() {
//        super.onStart()
//        val account: GoogleSignInAccount? = GoogleSignIn.getLastSignedInAccount(this)
//        updateUI(account)
//
//    }

    private fun updateUI(account: GoogleSignInAccount?) {
        if (account != null) {
            val authTask = AuthTask(account.idToken)
            val apiClient = Network.getInstance().create(TopicApi::class.java)
            val postToken = apiClient.postToken(authTask)
            postToken.enqueue(object : Callback<AuthSuccess> {
                override fun onResponse(call: Call<AuthSuccess>, response: Response<AuthSuccess>) {
                    if (response.body()?.token != null)

                        Toast.makeText(
                            this@GoogleSignInActivty,
                            response.body()?.message + response.body()?.token,
                            Toast.LENGTH_SHORT
                        ).show()
                    val prefs: SharedPreferences = applicationContext.getSharedPreferences(
                        "LOGIN",
                        Context.MODE_PRIVATE
                    )
                    val editor: SharedPreferences.Editor = prefs.edit()
                    editor.putString("login_key", response.body()?.token)
                    editor.apply()
                    val intent = Intent(this@GoogleSignInActivty, TopicsActivity::class.java)
                    intent.putExtra("token", response.body()?.token)
                    startActivity(intent)
                    finish()
                }

                override fun onFailure(call: Call<AuthSuccess>, t: Throwable) {
                    Toast.makeText(this@GoogleSignInActivty, "Invalid Account", Toast.LENGTH_SHORT)
                        .show()
                }

            })
        }

    }

    private fun handleSignInResult(task: Task<GoogleSignInAccount>) {
        try {
            val account: GoogleSignInAccount? = task.getResult(ApiException::class.java)
            updateUI(account)


        } catch (e: ApiException) {
            Toast.makeText(this, "Invalid Account", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 101) {
            // The Task returned from this call is always completed, no need to attach
            // a listener.
            val task: Task<GoogleSignInAccount> = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleSignInResult(task)

        }


    }
}