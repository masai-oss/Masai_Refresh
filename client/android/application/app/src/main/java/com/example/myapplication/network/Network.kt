package com.example.myapplication.network

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class Network {


    companion object {

        private val httpLoggingInterceptor =
            HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY)

        fun getInstance(): Retrofit {
            return Retrofit.Builder()

                .baseUrl("https://refresh.masai.tech/")
//                .baseUrl("https://apiquizine.herokuapp.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .client(OkHttpClient.Builder().addInterceptor(httpLoggingInterceptor).build())
                .build()
        }
    }

}




//    companion object {
//        private const val BASE_URL = "https://apiquizine.herokuapp.com/api/"
//
//
//        fun <Api> buildApi(
//            api: Class<Api>,
//            authToken: String? = null
//        ): Api {
//            return Retrofit.Builder()
//                .baseUrl(BASE_URL)
//                .client(
//                    OkHttpClient.Builder()
//                        .addInterceptor { it ->
//                            it.proceed(it.request().newBuilder().also {
//                                it.addHeader("Authorization", "Bearer $authToken")
//                            }.build())
//                        }
//                        .also {
//                            if (BuildConfig.DEBUG) {
//                                val logging = HttpLoggingInterceptor()
//                                logging.apply {
//                                    logging.level = HttpLoggingInterceptor.Level.BODY
//                                }
//
//                            }
//                        }.build()
//                )
//                .addConverterFactory(GsonConverterFactory.create())
//                .build()
//                .create(api)
//
//        }
//    }
//}
