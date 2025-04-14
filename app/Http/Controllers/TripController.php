<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Trip;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("trips/index", [
            "trips" => Trip::where("email", auth()->user()->email)
                ->latest()
                ->paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {   
        $fromMap = request()->query('fromMap', false);
        $lat = request()->query('lat');
        $lng = request()->query('lng');

        return Inertia::render("trips/create", [
            "fromMap" => filter_var($fromMap, FILTER_VALIDATE_BOOLEAN),
            "lat" => $lat,
            "lng" => $lng,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'latitude' => 'required|regex:/^-?\d+(\.\d+)?$/',
            'longitude' => 'required|regex:/^-?\d+(\.\d+)?$/',
        ]);

        $latitude = (float) $validated['latitude'];
        $longitude = (float) $validated['longitude'];

        Trip::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'latitude' => $latitude,
            'longitude' => $longitude,
            'email' => auth()->user()->email,
        ]);

        return redirect()->route('map')->with('success', 'Trip created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $fromMap = request()->query('fromMap', false);

        $trip = Trip::find($id);
        return Inertia::render("trips/update", [
            "trip" => $trip,
            "fromMap" => filter_var($fromMap, FILTER_VALIDATE_BOOLEAN)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'latitude' => 'required|regex:/^-?\d+(\.\d+)?$/',
            'longitude' => 'required|regex:/^-?\d+(\.\d+)?$/',
        ]);
    
        $trip = Trip::findOrFail($id);
    
        $trip->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'latitude' => (float) $validated['latitude'],
            'longitude' => (float) $validated['longitude'],
        ]);

        return redirect()->route('map')->with('success', 'Trip updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Trip::destroy($id);

        return redirect()->route('map')->with('success', 'Trip deleted successfully.');
    }
}
