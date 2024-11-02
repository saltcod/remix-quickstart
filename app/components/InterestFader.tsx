'use client'
import React from 'react'
import Typewriter from 'typewriter-effect'

const jobs = ['nurse', 'programmer', 'teacher', 'fireman', 'painter', 'writer', 'chef', 'doctor']
const hobbies = ['cooking', 'hiking', 'reading', 'running', 'swimming', 'cycling', 'volunteering', 'yoga']

export default function InterestFader() {
  return (
    <div className="mt-4">
      <div className="flex items-center">
        Find a<span className="block mr-1.5"></span>
        <Typewriter
          options={{
            strings: jobs,
            autoStart: true,
            loop: true,
            delay: 200,
          }}
        />
        who's into<span className="block mr-1"></span>
        <span className="fade-in-out-item">
          <Typewriter
            options={{
              strings: hobbies,
              autoStart: true,
              loop: true,
              delay: 400,
            }}
          />
        </span>
      </div>
    </div>
  )
}
