package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.myapplication.AuthResponse.AuthTask
import com.example.myapplication.Retrofit.ApiClient
import com.example.myapplication.Retrofit.Network
import com.example.myapplication.activities.TopicsActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.Scopes
import com.google.android.gms.common.SignInButton
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.common.api.Scope
import com.google.android.gms.tasks.Task
import kotlinx.android.synthetic.main.activity_google_sign_in_activty.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GoogleSignInActivty : AppCompatActivity() {
    lateinit var mGoogleSignInClient: GoogleSignInClient
    lateinit var mGoogleSignInAccount: GoogleSignInAccount
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_google_sign_in_activty)
        val gso: GoogleSignInOptions =
            GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestIdToken("1076096355894-tlqr133lhbep9c9n8jkv24msqri7pvb2.apps.googleusercontent.com").requestScopes(Scope(Scopes.PROFILE))
            .requestEmail().build()
        mGoogleSignInClient = GoogleSignIn.getClient(this@GoogleSignInActivty, gso)
        Log.d("token","start")
//        mGoogleSignInAccount = GoogleSignIn.getLastSignedInAccount(this)!!
        gSignInBtn.setSize(SignInButton.SIZE_STANDARD)
        gSignInBtn.setOnClickListener {
            signIn()
        }
    }

    private fun signIn() {
        val intent: Intent = mGoogleSignInClient.signInIntent
        startActivityForResult(intent, 101)
    }

    override fun onStart() {
        super.onStart()
        val account: GoogleSignInAccount? = GoogleSignIn.getLastSignedInAccount(this)
        updateUI(account)

    }

    private fun updateUI(account: GoogleSignInAccount?) {
        if (account != null) {
            val authTask = AuthTask(account.idToken)
            val apiClient = Network.getInstance().create(ApiClient::class.java)
            val postToken = apiClient.postToken(authTask)
            postToken.enqueue(object : Callback<AuthSuccess>{
                override fun onResponse(call: Call<AuthSuccess>, response: Response<AuthSuccess>) {
                    if (response.body()?.token !=null)

                    Toast.makeText(this@GoogleSignInActivty, response.body()?.message +response.body()?.token,Toast.LENGTH_SHORT).show()
                    val intent = Intent(this@GoogleSignInActivty,TopicsActivity::class.java)
                    intent.putExtra("token",response.body()?.token)
                    startActivity(intent)
                }

                override fun onFailure(call: Call<AuthSuccess>, t: Throwable) {

                }

            })
        }

    }

    private fun handleSignInResult(task: Task<GoogleSignInAccount>) {
        try {
            val account : GoogleSignInAccount? = task.getResult(ApiException::class.java)
            updateUI(account)



        }catch (e : ApiException){
            Toast.makeText(this,"Invalid Account",Toast.LENGTH_SHORT).show()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 101) {
            // The Task returned from this call is always completed, no need to attach
            // a listener.
            val task: Task<GoogleSignInAccount> = GoogleSignIn.getSignedInAccountFromIntent(data)
            handleSignInResult(task);

        }


    }
}