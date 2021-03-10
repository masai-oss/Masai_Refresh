package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
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

class GoogleSignInActivty : AppCompatActivity() {
    lateinit var mGoogleSignInClient: GoogleSignInClient
    lateinit var mGoogleSignInAccount: GoogleSignInAccount
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_google_sign_in_activty)
        val gso: GoogleSignInOptions =
            GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).requestServerAuthCode("1076096355894-hckb6b23kt28maoss24s10hpbdn0vuub.apps.googleusercontent.com").requestScopes(
                Scope(Scopes.DRIVE_APPFOLDER)
            ).requestEmail().build()
        mGoogleSignInClient = GoogleSignIn.getClient(this@GoogleSignInActivty, gso)
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
//        val account: GoogleSignInAccount? = GoogleSignIn.getLastSignedInAccount(this)
//        updateUI(account)

    }

    private fun updateUI(account: GoogleSignInAccount?) {

    }

    private fun handleSignInResult(task: Task<GoogleSignInAccount>) {
        try {
            val account : GoogleSignInAccount? = task.getResult(ApiException::class.java)
            val token : String? = account?.idToken
            val str : String? = account?.displayName + account?.serverAuthCode
            Toast.makeText(this, "str :$str Token : $token",Toast.LENGTH_LONG).show()

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